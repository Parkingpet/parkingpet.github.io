from playwright.sync_api import sync_playwright
import time
import os

def run_adversarial_tests():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        url = "http://localhost:5173"
        print(f"Connecting to {url}...")
        try:
            page.goto(url)
        except Exception as e:
            print(f"Failed to connect to {url}. Is the dev server running?")
            browser.close()
            return

        page.wait_for_timeout(2000)
        results = []

        def test_tool(tab_name, input_val, action_name, expected_substring=None, adversarial_desc="", is_prompts=False):
            print(f"Testing {tab_name} - {adversarial_desc}")
            try:
                if is_prompts:
                    # Navigate to prompts page
                    page.evaluate("window.history.pushState(null, '', '/prompts'); window.dispatchEvent(new PopStateEvent('popstate'));")
                    page.wait_for_timeout(1000)
                else:
                    # Ensure we are on home page
                    page.evaluate("window.history.pushState(null, '', '/'); window.dispatchEvent(new PopStateEvent('popstate'));")
                    page.get_by_role("button", name=tab_name, exact=True).click()

                if input_val is not None:
                    if is_prompts:
                        page.get_by_role("textbox", name="Prompt Title").fill(input_val.get('title', ''))
                        page.get_by_role("textbox", name="Prompt Description").fill(input_val.get('desc', ''))
                    else:
                        textarea = page.locator("textarea[aria-label='Tool input']")
                        if textarea.count() > 0:
                            textarea.fill(input_val)

                page.get_by_role("button", name=action_name, exact=True).click()

                if is_prompts:
                    # For prompts, check if it's in the list
                    output = page.locator("body").inner_text()
                else:
                    output = page.locator("textarea[aria-label='Tool output']").input_value()

                status = "PASS"
                if expected_substring and expected_substring not in output:
                    status = "FAIL"

                results.append({
                    "tool": tab_name,
                    "desc": adversarial_desc,
                    "input": str(input_val),
                    "output": output[:100],
                    "status": status
                })
                print(f"  Result: {status}")
            except Exception as e:
                print(f"  Error testing {tab_name}: {str(e)}")
                results.append({
                    "tool": tab_name,
                    "desc": adversarial_desc,
                    "input": str(input_val),
                    "output": f"ERROR: {str(e)}",
                    "status": "CRASH/TIMEOUT"
                })

        # --- EXISTING TESTS ---
        test_tool("Subnet Calc", "192.168.1.1/32", "Calculate", "Total Usable Hosts: 0", "Edge Case: /32")
        test_tool("Subnet Calc", "192.168.1.1/31", "Calculate", "Total Usable Hosts: 0", "Edge Case: /31")
        test_tool("Regex", "a" * 150, "Test", "Pattern too long", "Mitigation: Pattern too long")
        test_tool("Regex", "a\n" + "b" * 1100, "Test", "Input too long", "Mitigation: Input too long")
        test_tool("Regex", "[+\n", "Test", "Error: ", "Malformed Regex Pattern")
        test_tool("JWT Decoder", "a.eyJpZCI6MTIzLCJkYXRhIjoiaV8tXyJ9.c", "Decode", "\"id\": 123", "Base64URL support check")
        test_tool("JSON", "{invalid:json}", "Format", "Invalid JSON", "Invalid JSON Syntax")

        # --- NEW TRIAD TESTS ---

        # MAC Formatter
        test_tool("MAC Formatter", "001122334455", "Colon", "00:11:22:33:44:55", "MAC: Happy Path")
        test_tool("MAC Formatter", "0011223344", "Colon", "Invalid MAC address format", "MAC: Boundary (Short)")
        test_tool("MAC Formatter", "GGHHIIJJKKLL", "Colon", "Invalid MAC address format", "MAC: Adversarial (Invalid Chars)")

        # IP Converter
        test_tool("IP Converter", "192.168.1.1", "Binary", "11000000.10101000.00000001.00000001", "IP: Happy Path")
        test_tool("IP Converter", "256.0.0.1", "Binary", "Invalid IPv4 address", "IP: Boundary (Out of range)")
        test_tool("IP Converter", "abc.def.ghi.jkl", "Binary", "Invalid IPv4 address", "IP: Adversarial (Non-numeric)")

        # YAML to JSON
        test_tool("YAML to JSON", "key: value", "Convert", "\"key\": \"value\"", "YAML: Happy Path")
        test_tool("YAML to JSON", "", "Convert", "{}", "YAML: Boundary (Empty)")

        # Prompt Submission
        test_tool("Prompt Repo", {"title": "Test Title", "desc": "Test Desc"}, "Submit Prompt", "Test Title", "Prompts: Happy Path", is_prompts=True)
        test_tool("Prompt Repo", {"title": "  ", "desc": "  "}, "Submit Prompt", None, "Prompts: Boundary (Empty/Whitespace)", is_prompts=True)

        print("\n--- Summary ---")
        failed = False
        for res in results:
            print(f"[{res['status']}] {res['tool']}: {res['desc']}")
            if res['status'] != "PASS":
                failed = True

        browser.close()
        if failed:
            import sys
            sys.exit(1)

if __name__ == "__main__":
    run_adversarial_tests()

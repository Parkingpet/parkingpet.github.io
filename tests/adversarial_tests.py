from playwright.sync_api import sync_playwright
import time

def run_adversarial_tests():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        url = "http://localhost:5173"
        print(f"Connecting to {url}...")
        page.goto(url)
        page.wait_for_timeout(2000)

        results = []

        def test_tool(tab_name, input_val, action_name, expected_substring=None, adversarial_desc=""):
            print(f"Testing {tab_name} - {adversarial_desc}")
            try:
                page.get_by_role("button", name=tab_name, exact=True).click()
                textarea = page.locator("textarea[aria-label='Tool input']")
                if textarea.count() > 0:
                    textarea.fill(input_val)
                page.get_by_role("button", name=action_name, exact=True).click()
                output = page.locator("textarea[aria-label='Tool output']").input_value()

                status = "PASS"
                if expected_substring and expected_substring not in output:
                    status = "FAIL"

                results.append({
                    "tool": tab_name,
                    "desc": adversarial_desc,
                    "input": input_val,
                    "output": output,
                    "status": status
                })
                print(f"  Result: {status} (Output: {output[:50]}...)")
            except Exception as e:
                print(f"  Error testing {tab_name}: {str(e)}")
                results.append({
                    "tool": tab_name,
                    "desc": adversarial_desc,
                    "input": input_val,
                    "output": f"ERROR: {str(e)}",
                    "status": "CRASH/TIMEOUT"
                })

        # --- Subnet Calc Tests ---
        test_tool("Subnet Calc", "192.168.1.1/32", "Calculate", "Total Usable Hosts: 0", "Edge Case: /32")
        test_tool("Subnet Calc", "192.168.1.1/31", "Calculate", "Total Usable Hosts: 0", "Edge Case: /31")

        # --- Regex Tests ---
        test_tool("Regex", "a" * 150, "Test", "Pattern too long", "Mitigation: Pattern too long")
        test_tool("Regex", "a\n" + "b" * 1100, "Test", "Input too long", "Mitigation: Input too long")
        test_tool("Regex", "[+\n", "Test", "Error: ", "Malformed Regex Pattern")

        # --- JWT Decoder Tests ---
        # Mocking a Base64URL string with _ and -
        # Payload: {"id":123,"data":"i_-_"}
        # Base64: eyJpZCI6MTIzLCJkYXRhIjoiaV8tXyJ9
        test_tool("JWT Decoder", "a.eyJpZCI6MTIzLCJkYXRhIjoiaV8tXyJ9.c", "Decode", "\"id\": 123", "Base64URL support check")

        # --- JSON Tool Tests ---
        test_tool("JSON", "{invalid:json}", "Format", "Invalid JSON", "Invalid JSON Syntax")
        test_tool("JSON", "{\"a\":1}" * 2000, "Format", "Input too long", "JSON: Mitigation (Input too long)")

        # --- YAML to JSON Tests ---
        test_tool("YAML to JSON", "url: https://example.com/api", "Convert", "https://example.com/api", "YAML: Colon in value")
        test_tool("YAML to JSON", "key: value\n" * 300, "Convert", "Input too long", "YAML: Mitigation (Input too long)")

        # --- MAC Formatter Tests ---
        test_tool("MAC Formatter", "0" * 1100, "Colon", "Input too long", "MAC: Mitigation (Input too long)")

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

from playwright.sync_api import sync_playwright
import sys
import time

def run_triad_tests():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        url = "http://localhost:5173"
        print(f"Connecting to {url}...")
        try:
            page.goto(url)
            page.wait_for_timeout(5000) # loading screen
        except Exception as e:
            print(f"Could not connect to {url}. Make sure the dev server is running.")
            browser.close()
            sys.exit(1)

        results = []

        def test_tool(tab_name, input_val, action_name, expected_substring=None, test_type="Happy Path"):
            print(f"[{test_type}] Testing {tab_name} with action {action_name}")
            try:
                # Navigate to the tool tab
                page.get_by_role("button", name=tab_name, exact=True).click()

                # Fill input if textarea exists
                textarea = page.locator("textarea[aria-label='Tool input']")
                if textarea.count() > 0:
                    textarea.fill(input_val)

                # Click action button
                page.get_by_role("button", name=action_name, exact=True).click()

                # Get output
                output_textarea = page.locator("textarea[aria-label='Tool output']")
                output = output_textarea.input_value()

                status = "PASS"
                if expected_substring and expected_substring not in output:
                    status = "FAIL"

                results.append({
                    "tool": tab_name,
                    "action": action_name,
                    "type": test_type,
                    "output": output,
                    "status": status
                })
                print(f"  Result: {status} (Output: {output[:50]}...)")
            except Exception as e:
                print(f"  Error testing {tab_name}: {str(e)}")
                results.append({
                    "tool": tab_name,
                    "action": action_name,
                    "type": test_type,
                    "output": f"ERROR: {str(e)}",
                    "status": "CRASH/TIMEOUT"
                })

        # --- Base64 ---
        test_tool("Base64", "hello", "Encode", "aGVsbG8=", "Happy Path")
        test_tool("Base64", "", "Encode", "", "Boundary (Empty)")
        test_tool("Base64", "!!!", "Decode", "Invalid", "Adversarial (Malformed)")

        # --- JSON ---
        test_tool("JSON", '{"a":1}', "Format", '"a": 1', "Happy Path")
        test_tool("JSON", "{}", "Format", "{}", "Boundary (Empty)")
        test_tool("JSON", "{invalid}", "Format", "Invalid", "Adversarial (Malformed)")

        # --- Timestamp ---
        test_tool("Timestamp", "1711411200", "ToDate", "2024-03-26", "Happy Path")
        test_tool("Timestamp", "0", "ToDate", "1970-01-01", "Boundary (0)")
        test_tool("Timestamp", "abc", "ToDate", "Invalid", "Adversarial (Non-numeric)")

        # --- UUID ---
        test_tool("UUID", "", "Generate", "-", "Happy Path") # Check for hyphen in UUID

        # --- URL ---
        test_tool("URL", "hello world", "Encode", "hello%20world", "Happy Path")
        test_tool("URL", "", "Encode", "", "Boundary (Empty)")
        test_tool("URL", "%ZZ", "Decode", "Invalid", "Adversarial (Malformed)")

        # --- SHA-256 ---
        test_tool("SHA-256", "test", "Hash", "9f86d081", "Happy Path")

        # --- Regex ---
        test_tool("Regex", "a\n\na", "Test", "Match found", "Happy Path")
        test_tool("Regex", "", "Test", "Error:", "Boundary (Empty)")
        test_tool("Regex", "[+\ninput", "Test", "Error:", "Adversarial (Malformed)")

        # --- JWT Decoder ---
        test_tool("JWT Decoder", "a.eyJpZCI6MTIzfQ.c", "Decode", '"id": 123', "Happy Path")
        test_tool("JWT Decoder", "a.b.c", "Decode", "Invalid", "Adversarial (Malformed)")

        # --- YAML to JSON ---
        test_tool("YAML to JSON", "key: value", "Convert", '"key": "value"', "Happy Path")
        test_tool("YAML to JSON", "url: https://api.com", "Convert", '"url": "https://api.com"', "Boundary (Colons)")
        test_tool("YAML to JSON", "a" * 2100, "Convert", "Input too long", "Adversarial (Too long)")

        # --- MAC Formatter ---
        test_tool("MAC Formatter", "001122334455", "Colon", "00:11:22:33:44:55", "Happy Path")
        test_tool("MAC Formatter", "001122", "Colon", "Invalid", "Boundary (Too short)")
        test_tool("MAC Formatter", "GG", "Colon", "Invalid", "Adversarial (Malformed)")

        # --- IP Converter ---
        test_tool("IP Converter", "192.168.1.1", "Binary", "11000000", "Happy Path")
        test_tool("IP Converter", "0.0.0.0", "Binary", "00000000", "Boundary (0.0.0.0)")
        test_tool("IP Converter", "256.0.0.1", "Binary", "Invalid", "Adversarial (Out of range)")

        # --- Subnet Calc ---
        test_tool("Subnet Calc", "192.168.1.0/24", "Calculate", "Total Usable Hosts: 254", "Happy Path")
        test_tool("Subnet Calc", "192.168.1.1/32", "Calculate", "Total Usable Hosts: 0", "Boundary (/32)")
        test_tool("Subnet Calc", "abc", "Calculate", "Invalid", "Adversarial (Malformed)")

        # --- Sed/Awk ---
        test_tool("Sed/Awk", "a\nb\na", "FindReplace", "b", "Happy Path")
        test_tool("Sed/Awk", "", "FindReplace", "Format:", "Boundary (Empty)")
        test_tool("Sed/Awk", ("a" * 150) + "\nb\nc", "FindReplace", "Pattern too long", "Adversarial (Too long)")

        print("\n--- Triad Summary ---")
        failed = False
        for res in results:
            print(f"[{res['status']}] {res['type']} - {res['tool']} ({res['action']})")
            if res['status'] != "PASS":
                failed = True

        browser.close()
        if failed:
            print("\nSome triad tests failed.")
            sys.exit(1)
        else:
            print("\nAll triad tests passed!")

if __name__ == "__main__":
    run_triad_tests()

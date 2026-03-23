from playwright.sync_api import sync_playwright
import sys
import time

def run_audit_tests():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        url = "http://localhost:5173"
        print(f"Connecting to {url}...")
        try:
            page.goto(url)
            page.wait_for_timeout(2000)
        except Exception as e:
            print(f"Could not connect to {url}. Make sure the dev server is running.")
            browser.close()
            sys.exit(1)

        results = []

        def test_tool(tab_name, input_val, action_name, expected_substring=None, adversarial_desc=""):
            print(f"Testing {tab_name} - {adversarial_desc}")
            try:
                # Navigate to the tool tab
                page.get_by_role("button", name=tab_name, exact=True).click()

                # Fill input
                textarea = page.locator("textarea[aria-label='Tool input']")
                if textarea.count() > 0:
                    textarea.fill(input_val)

                # Click action button
                page.get_by_role("button", name=action_name, exact=True).click()

                # Get output
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

        # --- IP Converter Tests ---
        # Happy Path
        test_tool("IP Converter", "192.168.1.1", "Binary", "11000000.10101000.00000001.00000001", "IP: Happy Path (Binary)")
        # Boundary
        test_tool("IP Converter", "0.0.0.0", "Decimal", "0", "IP: Boundary (0.0.0.0)")
        test_tool("IP Converter", "255.255.255.255", "Decimal", "4294967295", "IP: Boundary (255.255.255.255)")
        # Adversarial
        test_tool("IP Converter", "256.0.0.1", "Binary", "Invalid", "IP: Adversarial (Out of range octet)")
        test_tool("IP Converter", "abc.def.ghi.jkl", "Binary", "Invalid", "IP: Adversarial (Non-numeric)")

        # --- MAC Formatter Tests ---
        # Happy Path
        test_tool("MAC Formatter", "001122334455", "Colon", "00:11:22:33:44:55", "MAC: Happy Path (Colon)")
        # Boundary (Empty input)
        test_tool("MAC Formatter", "", "Colon", "Invalid", "MAC: Boundary (Empty)")
        # Adversarial (Malformed)
        test_tool("MAC Formatter", "GGHHIIJJKKLL", "Colon", "Invalid", "MAC: Adversarial (Invalid hex)")

        # --- Sed/Awk Tests ---
        # Happy Path (Find/Replace)
        test_tool("Sed/Awk", "hello\nworld\nhello there", "FindReplace", "world there", "SedAwk: Happy Path (Replace)")
        # Boundary (Malformed input for FindReplace - missing replacement)
        test_tool("Sed/Awk", "hello", "FindReplace", "Format:", "SedAwk: Boundary (Malformed input)")

        # Adversarial: Mitigation check (Pattern too long)
        test_tool("Sed/Awk", ("a" * 150) + "\nrep\ntext", "FindReplace", "Pattern too long", "SedAwk: Mitigation (Pattern too long)")
        # Adversarial: Mitigation check (Input too long)
        test_tool("Sed/Awk", "pat\nrep\n" + ("a" * 1100), "FindReplace", "Input too long", "SedAwk: Mitigation (Input too long)")

        print("\n--- Summary ---")
        failed = False
        for res in results:
            print(f"[{res['status']}] {res['tool']}: {res['desc']}")
            if res['status'] != "PASS":
                failed = True

        browser.close()
        if failed:
            print("\nSome tests failed.")
            sys.exit(1)
        else:
            print("\nAll audit tests passed!")

if __name__ == "__main__":
    run_audit_tests()

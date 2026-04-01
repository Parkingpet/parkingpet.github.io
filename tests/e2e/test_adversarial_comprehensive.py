from playwright.sync_api import sync_playwright
import sys
import time

def run_comprehensive_adversarial_suite():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        url = "http://localhost:5173"
        print(f"Connecting to {url}...")

        try:
            page.goto(url)
            page.wait_for_timeout(5000)
        except Exception as e:
            print(f"Failed to connect to {url}.")
            browser.close()
            sys.exit(1)

        results = []

        def test_tool(tab_name, input_val, action_name, expected_substring=None, desc=""):
            print(f"Testing {tab_name} - {desc}")
            try:
                btn = page.get_by_role("button", name=tab_name, exact=True)
                btn.wait_for(state="visible", timeout=5000)
                btn.click()

                textarea = page.locator("textarea[aria-label='Tool input']")
                if textarea.count() > 0:
                    textarea.wait_for(state="visible", timeout=5000)
                    textarea.fill(input_val)

                action_btn = page.get_by_role("button", name=action_name, exact=True)
                action_btn.wait_for(state="visible", timeout=5000)
                action_btn.click()

                output_area = page.locator("textarea[aria-label='Tool output']")
                output_area.wait_for(state="visible", timeout=5000)
                output = output_area.input_value()

                status = "PASS"
                if expected_substring and expected_substring not in output:
                    status = "FAIL"

                results.append({
                    "tool": tab_name,
                    "desc": desc,
                    "status": status,
                    "output": output[:100]
                })
                print(f"  Result: {status}")
            except Exception as e:
                print(f"  Error testing {tab_name}: {str(e)}")
                results.append({
                    "tool": tab_name,
                    "desc": desc,
                    "status": "ERROR",
                    "output": str(e)
                })

        # --- Base64 ---
        test_tool("Base64", "A" * 6000, "Encode", "too long", "Mitigation: Encode too long")
        test_tool("Base64", "A" * 8000, "Decode", "too long", "Mitigation: Decode too long")

        # --- JSON ---
        test_tool("JSON", "{\"k\":\"v\"}" * 2000, "Format", "too long", "Mitigation: JSON too long")
        test_tool("JSON", "{invalid:json}", "Format", "Invalid JSON", "Adversarial: Invalid Syntax")

        # --- YAML to JSON ---
        test_tool("YAML to JSON", "k: v\n" * 500, "Convert", "too long", "Mitigation: YAML too long")

        # --- URL ---
        test_tool("URL", "https://x.com/?" + "q=" * 3000, "Encode", "too long", "Mitigation: URL too long")

        # --- JWT Decoder ---
        test_tool("JWT Decoder", "a.eyJpZCI6MTIzLCJkYXRhIjoiaV8tXyJ9.c", "Decode", "\"id\": 123", "Base64URL support check")

        print("\n--- Comprehensive Adversarial Suite Results ---")
        failed = False
        for res in results:
            print(f"[{res['status']}] {res['tool']}: {res['desc']}")
            if res['status'] != "PASS":
                failed = True

        browser.close()
        if failed:
            sys.exit(1)

if __name__ == "__main__":
    run_comprehensive_adversarial_suite()

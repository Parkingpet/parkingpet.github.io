from playwright.sync_api import sync_playwright
import sys
import time

def run_sedawk_audit():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        url = "http://localhost:5173"
        print(f"Connecting to {url}...")
        try:
            page.goto(url)
            page.wait_for_timeout(2000)
        except Exception as e:
            print(f"Could not connect to server: {e}")
            sys.exit(1)

        print("Testing Sed/Awk Tool for ReDoS...")

        # Select Sed/Awk tab
        page.get_by_role("button", name="Sed/Awk", exact=True).click()

        # 1. Test Pattern length limit
        print("1. Testing pattern length limit (128)...")
        long_pattern = "a" * 150
        full_input = f"{long_pattern}\nREPLACED\ntext"
        textarea = page.locator("textarea[aria-label='Tool input']")
        textarea.fill(full_input)
        page.get_by_role("button", name="FindReplace", exact=True).click()
        output_textarea = page.locator("textarea[aria-label='Tool output']")
        output_val = output_textarea.input_value()
        print(f"   Output: {output_val}")

        # 2. Test Input length limit
        print("2. Testing input length limit (2048)...")
        large_input = "pattern\nreplacement\n" + ("a" * 3000)
        textarea.fill(large_input)
        page.get_by_role("button", name="FindReplace", exact=True).click()
        output_val = output_textarea.input_value()
        print(f"   Output: {output_val}")

        # 3. Test ReDoS with shorter malicious input (still within 2048 limit but enough for ReDoS if not careful)
        # However, our pattern limit 128 doesn't prevent (a+)+$
        # But we can see if it's still slow.
        redos_pattern = "(a+)+$"
        malicious_input = "a" * 25 + "!"
        full_input = f"{redos_pattern}\nREPLACED\n{malicious_input}"
        print(f"3. Attempting findReplace with pattern: {redos_pattern} and input length {len(malicious_input)}")
        textarea.fill(full_input)
        start_time = time.time()
        page.get_by_role("button", name="FindReplace", exact=True).click()
        output_val = output_textarea.input_value()
        duration = time.time() - start_time
        print(f"   Finished in {duration:.4f} seconds.")
        print(f"   Output: {output_val[:50]}...")

        browser.close()

if __name__ == "__main__":
    run_sedawk_audit()

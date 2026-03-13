from playwright.sync_api import sync_playwright

def test_json_error():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:5173")

        # Wait for the "JSON" tab to appear and click it
        page.get_by_role("button", name="JSON", exact=True).wait_for(state="visible", timeout=10000)
        page.get_by_role("button", name="JSON", exact=True).click()

        # Enter invalid JSON into the textarea
        page.locator("textarea[placeholder='Input...']").fill("{ invalid json }")

        # Click Format
        page.locator("button:has-text('Format')").click()

        # Verify the output
        output_textarea = page.locator("textarea[placeholder='Output will appear here...']")
        assert output_textarea.input_value() == "Invalid JSON"
        print("JSON Format error handling verified!")

        # Clear output (though clicking minify will overwrite it)
        # Click Minify
        page.locator("button:has-text('Minify')").click()

        # Verify the output
        assert output_textarea.input_value() == "Invalid JSON"
        print("JSON Minify error handling verified!")

        browser.close()

if __name__ == "__main__":
    test_json_error()

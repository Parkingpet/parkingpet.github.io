from playwright.sync_api import sync_playwright

def test_tools():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:5173")

        # Wait for the "Downloads" tab to appear
        page.locator("button:has-text('Downloads')").wait_for(state="visible", timeout=10000)

        # Click the Downloads tab
        page.locator("button:has-text('Downloads')").click()

        # Verify the links exist
        assert page.locator("a:has-text('Download PDF')").is_visible()
        assert page.locator("a:has-text('Download TXT')").is_visible()

        # Verify the hrefs
        pdf_href = page.locator("a:has-text('Download PDF')").get_attribute("href")
        txt_href = page.locator("a:has-text('Download TXT')").get_attribute("href")
        assert "./Mustafa_McLinn_Resume_2025.pdf" in pdf_href
        assert "./resume.txt" in txt_href

        print("Downloads tab verified successfully!")

        # Click the Subnet Calc tab
        page.locator("button:has-text('Subnet Calc')").click()

        # Enter CIDR into the textarea
        page.locator("textarea[placeholder='Input...']").fill("192.168.1.0/24")

        # Click calculate
        page.locator("button:has-text('Calculate')").click()

        # Verify the output
        output_textarea = page.locator("textarea[placeholder='Output will appear here...']")
        output_value = output_textarea.input_value()

        assert "IP Address: 192.168.1.0" in output_value
        assert "Subnet Mask: 255.255.255.0" in output_value
        assert "Network Address: 192.168.1.0" in output_value
        assert "Broadcast Address: 192.168.1.255" in output_value
        assert "Total Usable Hosts: 254" in output_value
        assert "Host Range: 192.168.1.1 - 192.168.1.254" in output_value

        print("Subnet Calculator verified successfully!")

        browser.close()

if __name__ == "__main__":
    test_tools()

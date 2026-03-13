from playwright.sync_api import sync_playwright

def test_link_sections():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:5173")

        # The sections are initially collapsed according to Tools.jsx state
        # collapsedLinks: { quickLinks: true, azure: true, aws: true, gcp: true }

        sections = [
            ("Quick Links", "View Live Site"),
            ("Azure Products", "Microsoft Intune"),
            ("AWS Products", "AWS Management Console"),
            ("Google Cloud Products", "GCP Console")
        ]

        for title, first_link_text in sections:
            print(f"Verifying section: {title}")
            # Check if title is visible
            header = page.locator(f"h3:has-text('{title}')")
            header.wait_for(state="visible", timeout=10000)

            # Use XPath to find the button that is a sibling of the h3
            button = page.locator(f"xpath=//h3[text()='{title}']/following-sibling::button")

            # Verify it says Expand initially
            assert "Expand" in button.inner_text()

            # Click to expand
            button.click()

            # Verify it says Collapse
            assert "Collapse" in button.inner_text()

            # Verify first link is visible
            link = page.locator(f"div:has-text('{first_link_text}')").first
            link.wait_for(state="visible", timeout=5000)
            print(f"Successfully expanded and verified {first_link_text}")

            # Click to collapse again
            button.click()
            assert "Expand" in button.inner_text()

        print("All link sections verified successfully!")
        browser.close()

if __name__ == "__main__":
    test_link_sections()

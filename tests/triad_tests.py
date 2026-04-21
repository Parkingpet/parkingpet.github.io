import unittest
from playwright.sync_api import sync_playwright
import time

class TestTriad(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.playwright = sync_playwright().start()
        cls.browser = cls.playwright.chromium.launch(headless=True)
        cls.context = cls.browser.new_context()
        cls.page = cls.context.new_page()

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()

    def setUp(self):
        self.page.goto("http://localhost:4173")
        # Wait for loading to finish
        self.page.wait_for_selector("text=DevOps Tools & Quick Links", timeout=15000)

    def navigate_to_tool(self, tool_name):
        # Click the tab specifically in the tabs section
        tab = self.page.locator("div[style*='display: flex; gap: 6px']").get_by_role("button", name=tool_name, exact=True)
        tab.wait_for()
        tab.click()

        # Ensure it's expanded - target the one in the tool body
        expand_btn = self.page.locator("div[style*='display: flex; flex-direction: column; gap: 10px']").get_by_role("button", name="Expand", exact=True)
        if expand_btn.is_visible():
            expand_btn.click()

        # Wait for textareas
        self.page.locator("textarea[aria-label='Tool input']").wait_for()
        self.page.locator("textarea[aria-label='Tool output']").wait_for()

    def test_base64_triad(self):
        self.navigate_to_tool("Base64")
        input_area = self.page.locator("textarea[aria-label='Tool input']")
        output_area = self.page.locator("textarea[aria-label='Tool output']")

        # Happy Path
        input_area.fill("hello")
        self.page.get_by_role("button", name="Encode", exact=True).click()
        # Wait for output to change from empty
        for _ in range(10):
            if output_area.input_value() == "aGVsbG8=": break
            time.sleep(0.5)
        self.assertEqual(output_area.input_value(), "aGVsbG8=")

        # Adversarial (Malformed Decode)
        input_area.fill("!!!")
        self.page.get_by_role("button", name="Decode", exact=True).click()
        for _ in range(10):
            if output_area.input_value() == "Invalid base64": break
            time.sleep(0.5)
        self.assertEqual(output_area.input_value(), "Invalid base64")

    def test_json_triad(self):
        self.navigate_to_tool("JSON")
        input_area = self.page.locator("textarea[aria-label='Tool input']")
        output_area = self.page.locator("textarea[aria-label='Tool output']")

        # Happy Path
        input_area.fill('{"a":1}')
        self.page.get_by_role("button", name="Format", exact=True).click()
        for _ in range(10):
            if '"a": 1' in output_area.input_value(): break
            time.sleep(0.5)
        self.assertIn('"a": 1', output_area.input_value())

        # Adversarial (Malformed)
        input_area.fill("{invalid}")
        self.page.get_by_role("button", name="Format", exact=True).click()
        for _ in range(10):
            if output_area.input_value() == "Invalid JSON": break
            time.sleep(0.5)
        self.assertEqual(output_area.input_value(), "Invalid JSON")

    def test_yaml_triad(self):
        self.navigate_to_tool("YAML to JSON")
        input_area = self.page.locator("textarea[aria-label='Tool input']")
        output_area = self.page.locator("textarea[aria-label='Tool output']")

        # Happy Path
        input_area.fill("url: https://example.com")
        self.page.get_by_role("button", name="Convert", exact=True).click()
        for _ in range(10):
            if '"url": "https://example.com"' in output_area.input_value(): break
            time.sleep(0.5)
        self.assertIn('"url": "https://example.com"', output_area.input_value())

        # Boundary (Max Length)
        long_input = "a: " + ("A" * 2050)
        input_area.fill(long_input)
        self.page.get_by_role("button", name="Convert", exact=True).click()
        for _ in range(10):
            if output_area.input_value() == "Error: Input too long": break
            time.sleep(0.5)
        self.assertEqual(output_area.input_value(), "Error: Input too long")

    def test_regex_triad(self):
        self.navigate_to_tool("Regex")
        input_area = self.page.locator("textarea[aria-label='Tool input']")
        output_area = self.page.locator("textarea[aria-label='Tool output']")

        # Happy Path
        input_area.fill("test\ng\nthis is a test")
        self.page.get_by_role("button", name="Test", exact=True).click()
        for _ in range(10):
            if output_area.input_value() == "Match found": break
            time.sleep(0.5)
        self.assertEqual(output_area.input_value(), "Match found")

        # Adversarial (Too long pattern)
        long_pattern = "a" * 130 + "\ng\nsome text"
        input_area.fill(long_pattern)
        self.page.get_by_role("button", name="Test", exact=True).click()
        for _ in range(10):
            if output_area.input_value() == "Error: Pattern too long": break
            time.sleep(0.5)
        self.assertEqual(output_area.input_value(), "Error: Pattern too long")

    def test_jwt_triad(self):
        self.navigate_to_tool("JWT Decoder")
        input_area = self.page.locator("textarea[aria-label='Tool input']")
        output_area = self.page.locator("textarea[aria-label='Tool output']")

        # Happy Path
        jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        input_area.fill(jwt)
        self.page.get_by_role("button", name="Decode", exact=True).click()
        for _ in range(10):
            if '"sub": "1234567890"' in output_area.input_value(): break
            time.sleep(0.5)
        self.assertIn('"sub": "1234567890"', output_area.input_value())

if __name__ == "__main__":
    unittest.main()

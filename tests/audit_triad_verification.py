
import unittest
import time
from playwright.sync_api import sync_playwright

class TestTriadAuditUI(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.playwright = sync_playwright().start()
        cls.browser = cls.playwright.chromium.launch(headless=True)
        cls.context = cls.browser.new_context()
        cls.page = cls.context.new_page()
        cls.url = "http://localhost:5173"
        try:
            cls.page.goto(cls.url)
            cls.page.wait_for_timeout(3000) # Wait for loading screen
        except Exception as e:
            print(f"Could not connect to {cls.url}. Make sure the dev server is running.")
            cls.browser.close()
            cls.playwright.stop()
            raise e

    @classmethod
    def tearDownClass(cls):
        cls.context.close()
        cls.browser.close()
        cls.playwright.stop()

    def test_subnet_happy_path(self):
        self.page.get_by_role("button", name="Subnet Calc", exact=True).click()
        self.page.get_by_role("textbox", name="Tool input").fill("192.168.1.0/24")
        self.page.get_by_role("button", name="Calculate").click()
        output = self.page.get_by_role("textbox", name="Tool output").input_value()
        self.assertIn("Network Address: 192.168.1.0", output)
        self.assertIn("Broadcast Address: 192.168.1.255", output)
        self.assertIn("Total Usable Hosts: 254", output)

    def test_subnet_boundary(self):
        self.page.get_by_role("button", name="Subnet Calc", exact=True).click()
        self.page.get_by_role("textbox", name="Tool input").fill("192.168.1.1/32")
        self.page.get_by_role("button", name="Calculate").click()
        output = self.page.get_by_role("textbox", name="Tool output").input_value()
        self.assertIn("Total Usable Hosts: 0", output)

    def test_subnet_adversarial(self):
        self.page.get_by_role("button", name="Subnet Calc", exact=True).click()
        self.page.get_by_role("textbox", name="Tool input").fill("256.0.0.1/24")
        self.page.get_by_role("button", name="Calculate").click()
        output = self.page.get_by_role("textbox", name="Tool output").input_value()
        self.assertIn("Invalid IP or Prefix", output)

    def test_jwt_happy_path(self):
        # Payload: {"sub":"123","iat":1516239022}
        token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJpYXQiOjE1MTYyMzkwMjJ9.signature"
        self.page.get_by_role("button", name="JWT Decoder", exact=True).click()
        self.page.get_by_role("textbox", name="Tool input").fill(token)
        self.page.get_by_role("button", name="Decode", exact=True).click()
        output = self.page.get_by_role("textbox", name="Tool output").input_value()
        self.assertIn('"sub": "123"', output)

    def test_jwt_boundary(self):
        # Base64URL characters '-' and '_'
        # Payload: {"data": "i_-_"}
        token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjogImlfLV8ifQ.signature"
        self.page.get_by_role("button", name="JWT Decoder", exact=True).click()
        self.page.get_by_role("textbox", name="Tool input").fill(token)
        self.page.get_by_role("button", name="Decode", exact=True).click()
        output = self.page.get_by_role("textbox", name="Tool output").input_value()
        self.assertIn('"data": "i_-_"', output)

    def test_jwt_adversarial(self):
        self.page.get_by_role("button", name="JWT Decoder", exact=True).click()
        self.page.get_by_role("textbox", name="Tool input").fill("malformed.token")
        self.page.get_by_role("button", name="Decode", exact=True).click()
        output = self.page.get_by_role("textbox", name="Tool output").input_value()
        self.assertIn("Invalid JWT token", output)

    def test_yaml_hardened(self):
        self.page.get_by_role("button", name="YAML to JSON", exact=True).click()
        # Test input with colons in values
        self.page.get_by_role("textbox", name="Tool input").fill("url: https://example.com\nkey: value")
        self.page.get_by_role("button", name="Convert", exact=True).click()
        output = self.page.get_by_role("textbox", name="Tool output").input_value()
        self.assertIn('"url": "https://example.com"', output)
        self.assertIn('"key": "value"', output)

if __name__ == '__main__':
    unittest.main()

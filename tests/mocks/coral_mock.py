import unittest
from unittest.mock import MagicMock

class GoogleCoralMock:
    """Mock for the Google Coral USB Accelerator."""
    def __init__(self):
        self.connected = True
        self.model_loaded = False

    def load_model(self, model_path):
        if not self.connected:
            raise RuntimeError("Coral TPU not connected")
        if not model_path:
            raise ValueError("Model path cannot be empty")
        self.model_loaded = True
        return True

    def run_inference(self, data):
        if not self.connected:
            raise RuntimeError("Coral TPU not connected")
        if not self.model_loaded:
            raise RuntimeError("No model loaded")
        if not data:
            raise ValueError("Inference data cannot be empty")
        return {"status": "success", "result": [0.9, 0.1]}

    def set_connection_state(self, state):
        self.connected = state

class TestCoralMock(unittest.TestCase):
    def test_mock_behavior(self):
        coral = GoogleCoralMock()
        self.assertTrue(coral.connected)
        coral.load_model("path/to/model")
        self.assertTrue(coral.model_loaded)
        result = coral.run_inference([1, 2, 3])
        self.assertEqual(result["status"], "success")

    def test_connection_error(self):
        coral = GoogleCoralMock()
        coral.set_connection_state(False)
        with self.assertRaises(RuntimeError):
            coral.load_model("model")

    def test_empty_input_error(self):
        coral = GoogleCoralMock()
        coral.load_model("model")
        with self.assertRaises(ValueError):
            coral.run_inference([])

if __name__ == "__main__":
    unittest.main()

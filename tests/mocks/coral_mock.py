import unittest
from unittest.mock import MagicMock

class GoogleCoralMock:
    """Mock for the Google Coral USB Accelerator."""
    def __init__(self, connected=True):
        self.connected = connected
        self.model_loaded = False

    def load_model(self, model_path):
        if not self.connected:
            raise RuntimeError("Coral TPU not connected")
        if not model_path or not isinstance(model_path, str):
            raise ValueError("Invalid model path")
        self.model_loaded = True
        return True

    def run_inference(self, data):
        if not self.connected:
            raise RuntimeError("Coral TPU not connected")
        if not self.model_loaded:
            raise RuntimeError("No model loaded")
        if not isinstance(data, (list, bytes)):
            raise ValueError("Invalid input data format")
        return {"status": "success", "result": [0.9, 0.1]}

class TestCoralMock(unittest.TestCase):
    def test_mock_behavior(self):
        coral = GoogleCoralMock()
        self.assertTrue(coral.connected)
        coral.load_model("path/to/model")
        self.assertTrue(coral.model_loaded)
        result = coral.run_inference([1, 2, 3])
        self.assertEqual(result["status"], "success")

    def test_not_connected(self):
        coral = GoogleCoralMock(connected=False)
        with self.assertRaises(RuntimeError):
            coral.load_model("path")
        with self.assertRaises(RuntimeError):
            coral.run_inference([1, 2])

    def test_invalid_input(self):
        coral = GoogleCoralMock()
        coral.load_model("path")
        with self.assertRaises(ValueError):
            coral.run_inference("invalid data")

if __name__ == "__main__":
    unittest.main()

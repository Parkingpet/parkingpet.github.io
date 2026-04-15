import unittest
from unittest.mock import MagicMock

class GoogleCoralMock:
    """Mock for the Google Coral USB Accelerator."""
    def __init__(self):
        self.connected = True
        self.model_loaded = False

    def set_connected(self, state):
        """Simulate physical connection state."""
        self.connected = bool(state)

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
            raise ValueError("Inference data must be list or bytes")
        return {"status": "success", "result": [0.9, 0.1]}

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
        coral.set_connected(False)
        with self.assertRaises(RuntimeError):
            coral.load_model("path/to/model")

    def test_value_errors(self):
        coral = GoogleCoralMock()
        with self.assertRaises(ValueError):
            coral.load_model(None)
        coral.load_model("path")
        with self.assertRaises(ValueError):
            coral.run_inference("not a list")

if __name__ == "__main__":
    unittest.main()

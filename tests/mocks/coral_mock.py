import unittest
from unittest.mock import MagicMock

class GoogleCoralMock:
    """Mock for the Google Coral USB Accelerator."""
    def __init__(self, connected=True):
        self.connected = connected
        self.model_loaded = False
        self.current_model = None

    def load_model(self, model_path):
        if not self.connected:
            raise RuntimeError("Coral TPU not connected")
        if not model_path:
            raise ValueError("Invalid model path")
        self.model_loaded = True
        self.current_model = model_path
        return True

    def run_inference(self, data):
        if not self.connected:
            raise RuntimeError("Coral TPU not connected")
        if not self.model_loaded:
            raise RuntimeError("No model loaded")
        if not data:
            return {"status": "empty_input", "result": []}

        # Simulate inference
        return {
            "status": "success",
            "result": [0.9, 0.1],
            "model": self.current_model,
            "latency_ms": 12.5
        }

    def disconnect(self):
        self.connected = False
        self.model_loaded = False
        self.current_model = None

class TestCoralMock(unittest.TestCase):
    def test_mock_behavior(self):
        coral = GoogleCoralMock()
        self.assertTrue(coral.connected)
        coral.load_model("path/to/model.tflite")
        self.assertTrue(coral.model_loaded)
        result = coral.run_inference([1, 2, 3])
        self.assertEqual(result["status"], "success")
        self.assertEqual(result["model"], "path/to/model.tflite")

    def test_disconnect(self):
        coral = GoogleCoralMock()
        coral.disconnect()
        with self.assertRaises(RuntimeError):
            coral.load_model("model")
        with self.assertRaises(RuntimeError):
            coral.run_inference([1,2,3])

    def test_empty_input(self):
        coral = GoogleCoralMock()
        coral.load_model("model")
        result = coral.run_inference([])
        self.assertEqual(result["status"], "empty_input")

if __name__ == "__main__":
    unittest.main()

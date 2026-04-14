import unittest
from unittest.mock import MagicMock

class GoogleCoralMock:
    """Mock for the Google Coral USB Accelerator."""
    def __init__(self):
        self.connected = True
        self.model_loaded = False
        self.current_model = None

    def set_connection_state(self, state: bool):
        self.connected = state

    def load_model(self, model_path: str):
        if not isinstance(model_path, str) or not model_path:
            raise ValueError("Invalid model path")
        if not self.connected:
            raise RuntimeError("Coral TPU not connected")
        self.model_loaded = True
        self.current_model = model_path
        return True

    def run_inference(self, data):
        if not self.connected:
            raise RuntimeError("Coral TPU not connected")
        if not self.model_loaded:
            raise RuntimeError("No model loaded")
        if not isinstance(data, (list, bytes)):
            raise ValueError("Input data must be a list or bytes")
        return {"status": "success", "result": [0.9, 0.1], "model": self.current_model}

class TestCoralMock(unittest.TestCase):
    def test_happy_path(self):
        coral = GoogleCoralMock()
        self.assertTrue(coral.connected)
        coral.load_model("path/to/model.tflite")
        self.assertTrue(coral.model_loaded)
        result = coral.run_inference([1, 2, 3])
        self.assertEqual(result["status"], "success")
        self.assertEqual(result["model"], "path/to/model.tflite")

    def test_connection_failure(self):
        coral = GoogleCoralMock()
        coral.set_connection_state(False)
        with self.assertRaises(RuntimeError) as cm:
            coral.load_model("model.tflite")
        self.assertEqual(str(cm.exception), "Coral TPU not connected")

    def test_invalid_input(self):
        coral = GoogleCoralMock()
        coral.load_model("model.tflite")
        with self.assertRaises(ValueError):
            coral.run_inference("invalid_data")

    def test_no_model_loaded(self):
        coral = GoogleCoralMock()
        with self.assertRaises(RuntimeError) as cm:
            coral.run_inference([1, 2, 3])
        self.assertEqual(str(cm.exception), "No model loaded")

if __name__ == "__main__":
    unittest.main()

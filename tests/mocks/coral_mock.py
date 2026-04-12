import unittest
import time
import random

class GoogleCoralMock:
    """Enhanced Mock for the Google Coral USB Accelerator."""
    def __init__(self, simulate_connection_failure=False):
        self.connected = not simulate_connection_failure
        self.model_loaded = False
        self.runtime_errors_enabled = False

    def toggle_runtime_errors(self, enabled):
        self.runtime_errors_enabled = enabled

    def load_model(self, model_path):
        if not self.connected:
            raise RuntimeError("Coral TPU not connected: Device not found")
        if not model_path.endswith('.tflite'):
            raise ValueError("Invalid model format: Expected .tflite")

        # Simulate loading delay
        time.sleep(0.1)
        self.model_loaded = True
        return True

    def run_inference(self, data):
        if not self.connected:
            raise RuntimeError("Coral TPU disconnected during operation")
        if not self.model_loaded:
            raise RuntimeError("No model loaded for inference")
        if not isinstance(data, (list, bytes)):
            raise ValueError("Input data must be list or bytes")

        if self.runtime_errors_enabled and random.random() < 0.1:
            raise RuntimeError("Internal TPU Error: Hardware timeout")

        return {"status": "success", "result": [0.95, 0.05]}

class TestCoralMock(unittest.TestCase):
    def test_happy_path(self):
        coral = GoogleCoralMock()
        self.assertTrue(coral.connected)
        coral.load_model("model.tflite")
        self.assertTrue(coral.model_loaded)
        result = coral.run_inference([1, 2, 3])
        self.assertEqual(result["status"], "success")

    def test_connection_failure(self):
        coral = GoogleCoralMock(simulate_connection_failure=True)
        with self.assertRaises(RuntimeError):
            coral.load_model("model.tflite")

    def test_invalid_model(self):
        coral = GoogleCoralMock()
        with self.assertRaises(ValueError):
            coral.load_model("model.txt")

    def test_inference_without_model(self):
        coral = GoogleCoralMock()
        with self.assertRaises(RuntimeError):
            coral.run_inference([1])

    def test_invalid_input(self):
        coral = GoogleCoralMock()
        coral.load_model("model.tflite")
        with self.assertRaises(ValueError):
            coral.run_inference("invalid string")

if __name__ == "__main__":
    unittest.main()

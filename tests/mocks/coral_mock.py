import unittest
from unittest.mock import MagicMock

class GoogleCoralMock:
    """Mock for the Google Coral USB Accelerator."""
    def __init__(self, simulate_disconnection=False):
        self.connected = not simulate_disconnection
        self.model_loaded = False
        self.last_error = None

    def connect(self):
        """Simulate connecting the hardware."""
        self.connected = True
        return True

    def disconnect(self):
        """Simulate disconnecting the hardware."""
        self.connected = False
        self.model_loaded = False

    def load_model(self, model_path):
        """Simulate loading a model file."""
        if not self.connected:
            self.last_error = "Coral TPU not connected"
            raise RuntimeError(self.last_error)

        if not model_path or not isinstance(model_path, str):
            self.last_error = "Invalid model path"
            raise ValueError(self.last_error)

        # Simulate some logic based on file extension
        if not model_path.endswith('.tflite'):
            self.last_error = "Model must be a .tflite file"
            raise ValueError(self.last_error)

        self.model_loaded = True
        return True

    def run_inference(self, data):
        """Simulate running inference on input data."""
        if not self.connected:
            self.last_error = "Coral TPU not connected"
            raise RuntimeError(self.last_error)

        if not self.model_loaded:
            self.last_error = "No model loaded"
            raise RuntimeError(self.last_error)

        if data is None:
            self.last_error = "Input data cannot be None"
            raise ValueError(self.last_error)

        # Basic validation of data format
        if not isinstance(data, (list, bytes)):
            self.last_error = "Input data must be a list or bytes"
            raise ValueError(self.last_error)

        return {"status": "success", "result": [0.9, 0.1], "latency_ms": 1.5}

class TestCoralMock(unittest.TestCase):
    def test_happy_path(self):
        coral = GoogleCoralMock()
        self.assertTrue(coral.connected)
        coral.load_model("model.tflite")
        self.assertTrue(coral.model_loaded)
        result = coral.run_inference([1, 2, 3])
        self.assertEqual(result["status"], "success")
        self.assertIn("latency_ms", result)

    def test_connection_states(self):
        coral = GoogleCoralMock(simulate_disconnection=True)
        self.assertFalse(coral.connected)
        with self.assertRaises(RuntimeError):
            coral.load_model("model.tflite")

        coral.connect()
        self.assertTrue(coral.connected)
        coral.load_model("model.tflite")
        self.assertTrue(coral.model_loaded)

        coral.disconnect()
        self.assertFalse(coral.connected)
        self.assertFalse(coral.model_loaded)

    def test_input_validation(self):
        coral = GoogleCoralMock()
        with self.assertRaises(ValueError):
            coral.load_model(None)
        with self.assertRaises(ValueError):
            coral.load_model("not_a_model.txt")

        coral.load_model("model.tflite")
        with self.assertRaises(ValueError):
            coral.run_inference(None)
        with self.assertRaises(ValueError):
            coral.run_inference("invalid data type")

if __name__ == "__main__":
    unittest.main()

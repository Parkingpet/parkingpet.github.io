import unittest
from unittest.mock import MagicMock

class GoogleCoralMock:
    """Mock for the Google Coral USB Accelerator."""
    def __init__(self):
        self.connected = True
        self.model_loaded = False

    def set_connected(self, state: bool):
        """Simulate hardware connection/disconnection."""
        self.connected = state

    def load_model(self, model_path: str):
        """Simulate loading a model onto the TPU."""
        if not isinstance(model_path, str) or not model_path:
            raise ValueError("Invalid model path")
        if not self.connected:
            raise RuntimeError("Coral TPU not connected")
        self.model_loaded = True
        return True

    def run_inference(self, data):
        """Simulate running inference on the TPU."""
        if not self.connected:
            raise RuntimeError("Coral TPU not connected")
        if not self.model_loaded:
            raise RuntimeError("No model loaded")
        if not data:
            raise ValueError("Input data cannot be empty")
        return {"status": "success", "result": [0.9, 0.1]}

class TestCoralMock(unittest.TestCase):
    def test_mock_behavior(self):
        coral = GoogleCoralMock()
        self.assertTrue(coral.connected)
        coral.load_model("path/to/model")
        self.assertTrue(coral.model_loaded)
        result = coral.run_inference([1, 2, 3])
        self.assertEqual(result["status"], "success")

if __name__ == "__main__":
    unittest.main()

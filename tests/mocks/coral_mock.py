class CoralMock:
    """Mock for Google Coral USB Accelerator."""
    def __init__(self):
        self.initialized = False
        print("CoralMock initialized")

    def load_model(self, model_path):
        if not self.initialized:
            self.initialized = True
            print(f"CoralMock: Loading model from {model_path}")
        return True

    def run_inference(self, input_data):
        print("CoralMock: Running inference")
        return {"status": "success", "detections": []}

    def close(self):
        self.initialized = False
        print("CoralMock: Connection closed")

def get_coral_device():
    return CoralMock()

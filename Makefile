PYTHON?=python
POETRY?=poetry

.PHONY: install lint format test run-api train fetch onnx clean

install:
	$(PYTHON) -m pip install -U pip
	$(PYTHON) -m pip install -e .[dev]

lint:
	ruff check .

format:
	ruff format .

test:
	pytest -q

fetch:
	$(PYTHON) scripts/fetch_data.py

train:
	$(PYTHON) scripts/train_model.py

run-api:
	$(PYTHON) scripts/run_api.py

onnx:
	$(PYTHON) scripts/export_onnx.py

clean:
	rm -rf .pytest_cache .ruff_cache .mypy_cache dist build

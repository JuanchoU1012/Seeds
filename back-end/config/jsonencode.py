import base64

def prepare_for_json(item):
    if isinstance(item, bytes):
        return base64.b64encode(item).decode('utf-8')
    elif isinstance(item, dict):
        return {k: prepare_for_json(v) for k, v in item.items()}
    elif isinstance(item, list):
        return [prepare_for_json(i) for i in item]
    else:
        return item
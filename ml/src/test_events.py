import requests
import json
import time

# Directly test Data Processing first
weather_url = "http://localhost:8083/api/processing/weather"

# Check Data Processing directly
disasters_processing_url = (
    "http://localhost:8083/api/processing/weather/disasters"
)

# Check the same endpoint through API Gateway
disasters_gateway_url = (
    "http://localhost:8080/api/processing/weather/disasters"
)

payload = {
    "location": "Houston",
    "latitude": 29.7604,
    "longitude": -95.3698,
    "observedAt": "2026-08-18T21:07:36.643Z",

    "temperature": 25.0,
    "humidity": 50.0,
    "rainfall": 50.0,
    "pressure": 1010.0,
    "windSpeed": 25.0,
    "soilMoisture": 0.8
}

print("=" * 60)
print("TESTING DATA PROCESSING -> DISASTER EVENTS")
print("=" * 60)

# --------------------------------------------------
# 1. POST weather data directly to Data Processing
# --------------------------------------------------

print("\nSending POST:")
print(weather_url)

try:
    response = requests.post(
        weather_url,
        json=payload,
        timeout=30
    )

    print("Status:", response.status_code)
    print("Response:")

    try:
        print(json.dumps(response.json(), indent=2))
    except Exception:
        print(response.text)

except requests.exceptions.RequestException as e:
    print("POST ERROR:")
    print(e)


# Give the service a moment to update its event collection
time.sleep(2)


# --------------------------------------------------
# 2. GET disaster events directly from Data Processing
# --------------------------------------------------

print("\n" + "=" * 60)
print("GET DISASTER EVENTS - DATA PROCESSING")
print("=" * 60)

print(disasters_processing_url)

try:
    response = requests.get(
        disasters_processing_url,
        timeout=30
    )

    print("Status:", response.status_code)
    print("Response:")

    try:
        print(json.dumps(response.json(), indent=2))
    except Exception:
        print(response.text)

except requests.exceptions.RequestException as e:
    print("GET ERROR:")
    print(e)


# --------------------------------------------------
# 3. GET disaster events through API Gateway
# --------------------------------------------------

print("\n" + "=" * 60)
print("GET DISASTER EVENTS - API GATEWAY")
print("=" * 60)

print(disasters_gateway_url)

try:
    response = requests.get(
        disasters_gateway_url,
        timeout=30
    )

    print("Status:", response.status_code)
    print("Response:")

    try:
        print(json.dumps(response.json(), indent=2))
    except Exception:
        print(response.text)

except requests.exceptions.RequestException as e:
    print("GET ERROR:")
    print(e)


print("\n" + "=" * 60)
print("TEST COMPLETE")
print("=" * 60)
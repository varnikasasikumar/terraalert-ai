import requests


points = [
    (47.6062, -122.3321),  # Seattle center
    (47.7000, -122.3500),
    (47.5500, -122.3000),
    (47.4500, -122.2500),
    (47.6500, -122.4500),
]


url = "https://epqs.nationalmap.gov/v1/json"


print("=" * 60)
print("TESTING SEATTLE TERRAIN ELEVATION")
print("=" * 60)


for latitude, longitude in points:

    params = {
        "x": longitude,
        "y": latitude,
        "wkid": 4326,
        "units": "Meters",
        "includeDate": "False"
    }

    response = requests.get(
        url,
        params=params,
        timeout=30
    )

    print()
    print(
        "Location:",
        latitude,
        longitude
    )

    print(
        "HTTP status:",
        response.status_code
    )

    if response.status_code == 200:

        data = response.json()

        print(
            "Elevation:",
            data.get("value"),
            "meters"
        )

    else:

        print(
            "Request failed:",
            response.text
        )


print()
print("=" * 60)
print("TERRAIN TEST COMPLETE")
print("=" * 60)
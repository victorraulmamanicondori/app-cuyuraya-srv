import pandas as pd
import requests

# Load the Excel file
df = pd.read_excel('rptUbigeo.xls', sheet_name='ubigeo', engine='xlrd')  # Use 'xlrd' for .xls files

# Display the first few rows
print(df.head())

#base_url = "http://104.251.212.105:9000/api"
base_url = "http://127.0.0.1:9000/api"

headers = {
    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiMTIzNDU2NzgiLCJpYXQiOjE3Mjg3NDkzMjYsImV4cCI6MTcyODc2NzMyNn0.qavscMWZQSHtHv1Gl4UkC9HpTTrSvHsz6wRfQQQVwtQ",
    "Content-Type": "application/json"
}

data = {}

print(f"Cargando datos al {base_url}")

for index, row in df.iterrows():
	department = row['DEPARTAMENTO'].strip()
	province = row['PROVINCIA'].strip()
	district = row['DISTRITO'].strip()

	# Department
	dep_code = department[0:2]
	dep_name = department[2:].strip()

	if len(dep_code) and dep_code not in data:
		data[dep_code] = {
			'code': dep_code,
			'name': dep_name,
			'provinces': {}
		}

		payload = {
			"codigo": dep_code,
			"nombre": dep_name
		}

		response = requests.post(f"{base_url}/departamentos", headers=headers, json=payload)

		if response.status_code == 200 or response.status_code == 201:
		    print("Registro exitoso:", response.text)
		else:
		    print("Error:", response.status_code, response.text)

	# Province
	pro_code = province[0:2]
	pro_name = province[2:].strip()

	if len(pro_code) > 0 and pro_code not in data[dep_code]['provinces']:
		data[dep_code]['provinces'][pro_code] = {
			'code': pro_code,
			'name': pro_name,
			'districts': []
		}

		payload = {
			"codigo": f"{dep_code}{pro_code}",
			"nombre": pro_name
		}

		response = requests.post(f"{base_url}/provincias", headers=headers, json=payload)

		if response.status_code == 200 or response.status_code == 201:
		    print("Registro exitoso:", response.text)
		else:
		    print("Error:", response.status_code, response.text)

	# District
	dis_code = district[0:2]
	dis_name = district[2:].strip()

	if len(dis_code) > 0:
		data[dep_code]['provinces'][pro_code]['districts'].append({
			'code': dis_code,
			'name': dis_name
		})

		payload = {
			"codigo": f"{dep_code}{pro_code}{dis_code}",
			"nombre": dis_name
		}

		response = requests.post(f"{base_url}/distritos", headers=headers, json=payload)

		if response.status_code == 200 or response.status_code == 201:
		    pass
		    #print("Registro exitoso:", response.text)
		else:
		    print("Error:", response.status_code, response.text)

	

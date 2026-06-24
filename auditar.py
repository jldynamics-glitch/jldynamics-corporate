import os
import openai

openai.api_key = os.getenv("DEEPSEEK_API_KEY")
openai.api_base = "https://api.deepseek.com/v1"

print("[*] Iniciando Escaneo Global de JLDynamics...")

# Lista expandida con el núcleo de la landing y el producto Metrikka
archivos_objetivo = [
    "contexto.md",
    "index.html",
    "script.js",
    "styles.css",
    "productos/Metrikka/index.html",
    "productos/Metrikka/script.js",
    "productos/Metrikka/styles.css"
]

prompt_archivos = ""

for nombre in archivos_objetivo:
    if os.path.exists(nombre):
        print(f"[+] Indexando: {nombre}")
        with open(nombre, "r", encoding="utf-8") as f:
            prompt_archivos += f"\n\n=== ARCHIVO: {nombre} ===\n" + f.read()
    else:
        # Intento alternativo en minúsculas por si acaso
        nombre_min = nombre.replace("Metrikka", "metrikka")
        if os.path.exists(nombre_min):
            print(f"[+] Indexando: {nombre_min}")
            with open(nombre_min, "r", encoding="utf-8") as f:
                prompt_archivos += f"\n\n=== ARCHIVO: {nombre_min} ===\n" + f.read()
        else:
            print(f"[!] No encontrado: {nombre}")

instruccion_usuario = (
    "Realiza una auditoría técnica profunda. Verifica por qué no se detectó el menú hamburguesa o el 3D Tilt "
    "(revisa script.js y styles.css). Analiza minuciosamente el código del producto Metrikka: "
    "valida la fórmula matemática del simulador Snowball, la persistencia de datos, y que la función de "
    "exportación del prompt de IA al portapapeles no falle en entornos móviles o HTTPS."
)

prompt_final = f"{instruccion_usuario}\n\nCódigo fuente del proyecto:\n{prompt_archivos}"

print("[*] Enviando bloque completo a deepseek-v4-pro... Esto puede tardar unos segundos.")

try:
    response = openai.ChatCompletion.create(
        model="deepseek-v4-pro",
        messages=[
            {"role": "system", "content": "Eres un arquitecto de software senior y auditor de ciberseguridad. Tu objetivo es encontrar bugs ocultos, fallas de lógica financiera y asegurar el 10/10 en cumplimiento técnico."},
            {"role": "user", "content": prompt_final}
        ],
        temperature=0.1
    )
    
    print("\n================ DETECCION DE BUGS Y AUDITORÍA FINAL ================\n")
    print(response.choices[0].message['content'])
    print("\n=====================================================================\n")

except Exception as e:
    print(f"\n[!] Error en la comunicación: {e}")

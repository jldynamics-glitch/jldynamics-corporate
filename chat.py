import os
import openai

openai.api_key = os.getenv("DEEPSEEK_API_KEY")
openai.api_base = "https://api.deepseek.com/v1"

print("\n====================================================================")
print("   JLDYNAMICS-CHAT V2 ◆ MODO AGENTE DE ESCRITURA DIRECTA (2026)     ")
print("====================================================================\n")
print("[*] Escribe tu instrucción de desarrollo o haz preguntas generales.")
print("[*] Si mencionas un archivo (ej: index.html), el agente lo modificará.")
print("[*] Escribe 'salir' para terminar.\n")

system_prompt = (
    "Eres un ingeniero de software senior y experto en automatización. "
    "Cuando el usuario te pida modificar un archivo (ej. index.html, script.js), debes devolver "
    "EXCLUSIVAMENTE el contenido completo y corregido de ese archivo dentro de un bloque de código markdown. "
    "No saludes, no des explicaciones, no pongas texto antes o después del bloque de código. "
    "Solo devuelve el archivo modificado de inicio a fin listo para ser guardado. "
    "Si el usuario te hace una pregunta general o de control, respóndela normalmente con claridad."
)

while True:
    try:
        user_input = input("JLDynamics-Agente 🛠️ > ")
        if user_input.lower() == 'salir':
            print("[*] Cerrando agente.")
            break
        if not user_input.strip():
            continue
            
        archivo_destino = None
        contexto_archivos = ""
        
        # Detectar si el usuario menciona un archivo válido en su entrada
        for palabra in user_input.split():
            if os.path.exists(palabra) and os.path.isfile(palabra):
                archivo_destino = palabra
                with open(palabra, "r", encoding="utf-8") as f:
                    contexto_archivos += f"\n\n--- ARCHIVO ORIGINAL ({palabra}) ---\n" + f.read()
        
        prompt_final = user_input + contexto_archivos
        
        if archivo_destino:
            print(f"[*] Analizando y reescribiendo {archivo_destino} con deepseek-v4-pro...")
        else:
            print("[*] Conectando con DeepSeek...")
        
        response = openai.ChatCompletion.create(
            model="deepseek-v4-pro",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt_final}
            ],
            temperature=0.1
        )
        
        respuesta_ia = response.choices[0].message['content']
        
        # Si se identificó un archivo destino y la respuesta trae código, sobreescribimos
        if archivo_destino and "```" in respuesta_ia:
            lineas = respuesta_ia.split("\n")
            codigo_limpio = []
            en_bloque = False
            for linea in lineas:
                if linea.startswith("```"):
                    en_bloque = not en_bloque
                    continue
                if en_bloque:
                    codigo_limpio.append(linea)
            nuevo_contenido = "\n".join(codigo_limpio)
            
            # Respaldar original
            os.system(f"cp \"{archivo_destino}\" \"{archivo_destino}.bak\"")
            
            with open(archivo_destino, "w", encoding="utf-8") as f:
                f.write(nuevo_contenido.strip())
                
            print(f"[+] ¡ÉXITO! {archivo_destino} ha sido modificado automáticamente.")
            print(f"[i] Respaldo guardado en {archivo_destino}.bak\n")
        else:
            # Si era una pregunta común, imprimimos la respuesta en pantalla
            print("\n" + respuesta_ia + "\n")
        
    except KeyboardInterrupt:
        print("\n[*] Interrumpido.")
        break
    except Exception as e:
        print(f"\n[!] Error: {e}\n")

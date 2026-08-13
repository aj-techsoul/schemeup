import os
import ssl
import subprocess

print("[SchemeUp HTTPS Setup] Creating local SSL certificates for HTTPS...")

cert_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
cert_file = os.path.join(cert_dir, 'localhost.pem')
key_file = os.path.join(cert_dir, 'localhost-key.pem')

# Generate self-signed certificate using openssl if available or python ssl helper
try:
    cmd = f'openssl req -x509 -newkey rsa:2048 -keyout "{key_file}" -out "{cert_file}" -days 365 -nodes -subj "/CN=localhost"'
    res = os.system(cmd)
    if res == 0:
        print(f"[SchemeUp HTTPS Setup] Certificate created:\n - {cert_file}\n - {key_file}")
    else:
        print("[SchemeUp HTTPS Setup] OpenSSL command not found. You can run Next.js HTTPS mode using: npm run dev:https")
except Exception as e:
    print(f"[SchemeUp HTTPS Setup] SSL setup note: {e}")

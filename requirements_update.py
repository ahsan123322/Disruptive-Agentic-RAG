import subprocess

def get_installed_version(package_name):
    result = subprocess.run(['pip', 'show', package_name], stdout=subprocess.PIPE)
    for line in result.stdout.decode(errors='ignore').splitlines():
        if line.startswith('Version:'):
            return line.split()[-1]
    return None

with open(r'D:\Study\Generative AI Tasks\Disruptive Ai\Updated Agentic-RAG\Disruptive-Agentic-RAG\requirements.txt', 'r') as infile, open('requirements_new.txt', 'w') as outfile:
    for line in infile:
        if '@' in line:
            package_name = line.split('@')[0].strip()
            version = get_installed_version(package_name)
            if version:
                outfile.write(f"{package_name}=={version}\n")
        else:
            outfile.write(line)

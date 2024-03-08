import numpy as np
import random
import math
import json
import sys
import re

def calcular_distancia_euclidiana(p1, p2):
    return math.sqrt((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2)

def extrair_numeros_da_localizacao(localizacao):
    numeros = re.findall(r'[-+]?\d*\.\d+|\d+', localizacao)
    if not numeros or len(numeros) < 2:
        raise ValueError("Localização inválida: " + localizacao)
    return (int(numeros[0]), int(numeros[1]))

def gera_matriz_distancias(clientes):
    clientes_validos = []
    for cliente in clientes:
        try:
            localizacao = extrair_numeros_da_localizacao(cliente['localizacao'])
            clientes_validos.append(cliente)
        except ValueError as e:
            print(f"Aviso: {e}")
    
    num_clientes = len(clientes_validos) + 1
    distancias = np.zeros((num_clientes, num_clientes))
    for i in range(num_clientes):
        for j in range(num_clientes):
            if i == 0:
                p1 = (0, 0)
            else:
                p1 = extrair_numeros_da_localizacao(clientes_validos[i-1]['localizacao'])

            if j == 0:
                p2 = (0, 0)
            else:
                p2 = extrair_numeros_da_localizacao(clientes_validos[j-1]['localizacao'])

            distancias[i][j] = calcular_distancia_euclidiana(p1, p2) if i != j else 0
    return distancias

def gera_caminho_aleatorio(clientes):
    caminho = list(range(1, len(clientes) + 1))  # Índices dos clientes + origem (0,0)
    random.shuffle(caminho)
    return [0] + caminho + [0]  # Adiciona o ponto de origem ao início e ao fim

def fitness(caminho, distancias):
    return sum(distancias[caminho[i]][caminho[i + 1]] for i in range(len(caminho) - 1))

def crossover(pai1, pai2):
    cut1, cut2 = sorted(random.sample(range(1, len(pai1) - 1), 2))
    filho = pai1[:cut1] + [c for c in pai2 if c not in pai1[cut1:cut2]] + pai1[cut1:]
    return filho

def mutacao(caminho, probabilidade_mutacao):
    if random.uniform(0, 1) < probabilidade_mutacao:
        idx1, idx2 = sorted(random.sample(range(1, len(caminho) - 1), 2))
        caminho[idx1], caminho[idx2] = caminho[idx2], caminho[idx1]
    return caminho

def selecao_pais(populacao, num_pais_selecionados):
    return random.sample(populacao, num_pais_selecionados)

def algoritmo_genetico(clientes, num_geracoes=100, tamanho_populacao=50, probabilidade_mutacao=0.1, num_pais_selecionados=10, num_geracoes_estagnacao=50):
    distancias = gera_matriz_distancias(clientes)
    populacao = [gera_caminho_aleatorio(clientes) for _ in range(tamanho_populacao)]
    
    melhor_fitness = float('inf')
    geracoes_sem_melhora = 0

    for geracao in range(num_geracoes):
        populacao = sorted(populacao, key=lambda x: fitness(x, distancias))
        melhor_atual = fitness(populacao[0], distancias)

        if melhor_atual < melhor_fitness:
            melhor_fitness = melhor_atual
            geracoes_sem_melhora = 0
        else:
            geracoes_sem_melhora += 1

        if geracoes_sem_melhora >= num_geracoes_estagnacao:
            break  # Critério de parada: estagnação da fitness

        novos_individuos = populacao[:2]  # Elitismo

        while len(novos_individuos) < tamanho_populacao:
            pais_selecionados = selecao_pais(populacao, num_pais_selecionados)
            pai1, pai2 = random.sample(pais_selecionados, 2)  # Seleção dos pais
            filho = crossover(pai1, pai2)
            filho = mutacao(filho, probabilidade_mutacao)
            novos_individuos.append(filho)

        populacao = novos_individuos

    melhor_caminho = sorted(populacao, key=lambda x: fitness(x, distancias))[0]
    caminho_nomes = [{"nome": "Empresa", "localizacao": "(0, 0)"}] if melhor_caminho[1] != 0 else []
    caminho_nomes += [clientes[i-1] for i in melhor_caminho[1:-1]]
    return caminho_nomes

if __name__ == "__main__":
    try:
        stdin_input = sys.stdin.read()
        clientes = json.loads(stdin_input)
        caminho_ordenado = algoritmo_genetico(clientes, num_geracoes=90, tamanho_populacao=40, probabilidade_mutacao=0.2, num_pais_selecionados=20, num_geracoes_estagnacao=45)        
        print(json.dumps({"success": True, "data": caminho_ordenado}, ensure_ascii=False))
        
    except json.JSONDecodeError as e:
        print(json.dumps({"success": False, "message": "Erro ao decodificar JSON: " + str(e)}, ensure_ascii=False))
        sys.exit(1)

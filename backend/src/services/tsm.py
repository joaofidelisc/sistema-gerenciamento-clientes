import numpy as np
import random
import operator

def geraDistanciasAleatorias():
    return [[0 if i == j else random.randint(0, 1000) for j in range(6)] for i in range(6)]

def atualizaMatrizDistancias(distancias):
    return [list(map(distancias[j].__getitem__, range(len(distancias)))) for j in range(len(distancias))]

def exibeMatrizDistancias(distancias):
    for linha in distancias:
        print(*linha)

def geraCaminhoAleatorio(cidades):
    return ["A"] + random.sample(cidades[1:-1], len(cidades) - 2) + ["F"]

def populacaoInicial(tamanho, cidades):
    return [geraCaminhoAleatorio(cidades) for _ in range(tamanho)]

#Retorna a distancia entre duas cidades consecutivas no vetor
def calculaDistancia(origem, dest, dict_cidades, distancias):
    distancia = distancias[dict_cidades[origem]][dict_cidades[dest]]
    return distancia

#Retorna a distancia total em um individuo
def fitness(dict_cidades, distancias, caminho):
    return sum(calculaDistancia(caminho[i], caminho[i + 1], dict_cidades, distancias) for i in range(len(caminho) - 1))

#Ordena pelos individuos mais aptos (menor distancia)
def elitismo(populacao, dict_cidades, distancias):
    mais_aptos = {}
    for individuo in range(len(populacao)):
        mais_aptos[individuo] = fitness(dict_cidades, distancias, populacao[individuo]) 
    return sorted(mais_aptos.items(), key=operator.itemgetter(1), reverse=False)
    
#Seleciona os dois melhores individuos com base no valor de seus fitness
#Garante a seleção de individuos não repetidos
def selecao_por_roleta(dict_melhores, populacao):
    parent1 = populacao[dict_melhores[0][0]]
    parent2 = populacao[dict_melhores[1][0]]
    while (parent1 == parent2):
        for i in range(len(dict_melhores)):
            parent2 = populacao[dict_melhores[i][0]]
    return parent1, parent2

#Cruza os dois melhores individuos
def crossover(pai1, pai2):
    inicio_gene = np.random.randint(1, len(pai1))
    fim_gene = np.random.randint(1, len(pai1))
    while inicio_gene == fim_gene:
        fim_gene = np.random.randint(1, len(pai1))

    filho1P1 = pai1[min(inicio_gene, fim_gene):max(inicio_gene, fim_gene)]
    filho2P1 = pai2[min(inicio_gene, fim_gene):max(inicio_gene, fim_gene)]

    filho1P2 = [gene for gene in pai2 if gene not in filho1P1]
    filho2P2 = [gene for gene in pai1 if gene not in filho2P1]

    filho1 = ["A"] + filho1P1 + filho1P2 + ["F"]
    filho2 = ["A"] + filho2P1 + filho2P2 + ["F"]

    return filho1, filho2

#Mutação de um individuo com base em uma taxa
def mutacao(filhos, taxa):
    for i in range(len(filhos)):
        if random.random() < taxa:
            pos_inicio = random.randint(1,4)
            pos_fim = random.randint(1,4)
            while (pos_inicio == pos_fim):
                pos_fim = random.randint(1,4)
                aux_troca = filhos[i][pos_inicio]
                filhos[i][pos_inicio] = filhos[i][pos_fim]
                filhos[i][pos_fim] = aux_troca
    return filhos

def exibeDados(populacao, num_individuos, dict_cidades, distancias):
    melhor_dict = elitismo(populacao, dict_cidades, distancias)
    melhor = populacao[melhor_dict[0][0]]
    for i in range(num_individuos):
        print(f'Caminho:{populacao[i]}+"A", distancia:{fitness(dict_cidades, distancias, populacao[i])}')
    print(f'Melhor caminho:{melhor}+"A", melhor distancia:{fitness(dict_cidades, distancias, melhor)}')

#Definição da matriz de distâncias
distancias = geraDistanciasAleatorias()
distancias = atualizaMatrizDistancias(distancias)
#exibe_matriz_distancias(distancias)

#Definição das cidades
cidades = ["A", "B", "C", "D", "E", "F"]
dict_cidades = {"A":0, "B":1, "C":2, "D":3, "E":4, "F":5}

#Definição do número de gerações
num_geracoes = 20

#Número de individuos
num_individuos = 10

#Populacao inicial
populacao_inicial = populacaoInicial(num_individuos, cidades)

for iteracao in range(num_geracoes):
    #Gera nova populacao
    nova_populacao = [["N" for coluna in range(6)] for linha in range(num_individuos)]
    #Exibe caminhos e distancias
    exibeDados(populacao_inicial, num_individuos, dict_cidades, distancias)
    print("\n")
    
    #Elitismo
    dict_melhores = elitismo(populacao_inicial, dict_cidades, distancias)
    
    elite = selecao_por_roleta(dict_melhores, populacao_inicial)
    nova_populacao[0] = elite[0]
    nova_populacao[1] = elite[1]
    
    num_filhos = 2
    while (num_filhos < num_individuos):
        #Cruzamento
        filhos = crossover(elite[0], elite[1])
        
        #Mutação (Arrumar)
        filhos = mutacao(filhos, 0.7)
        
        #Colocar os filhos na nova população
        nova_populacao[num_filhos] = filhos[0]
        nova_populacao[num_filhos+1] = filhos[1]
        
        #Aumenta o número de filhos
        num_filhos = num_filhos + 2
        #print(nova_populacao)
    populacao_inicial = nova_populacao.copy()
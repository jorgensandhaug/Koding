import math
# i = 0
# summen = 0
# t = 0

# P(I)= R_1*I^2
# I(t)=A*sin(t)
# A = 1 && R_1 = R_2 = 1 => P(I) = sin(t)^2
# Finner gjennomsnitt av effekten når det er vekselstrøm,
# og finner en tenkt likestrøm som må til for å få denne effekten
# I_e = sqrt(P_snitt) = 1/sqrt(2)



# while t < math.pi*2:
#     t+=0.000001
#     i+=1
#     summen += (math.sin(t))**2
# summen = summen/i
# print(math.sqrt(summen))
# print(1/math.sqrt(2))


def E(phi):
    return -800*math.cos(phi)

i = 0
phi = math.pi/2
sum = 0
while phi < math.pi*5/6:
    i+=1
    sum += E(phi)
    phi+=0.0001
print(sum/i)
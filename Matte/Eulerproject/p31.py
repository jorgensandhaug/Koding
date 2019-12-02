import math
p = 0.01
antall = 1
for a in range(3):
    for b in range(5):
        for c in range(11):
            for d in range(21):
                for e in range(41):
                    for f in range(101):
                        for g in range(201):
                            if(a + b*0.5 + c*0.2 + d*0.1 + e*0.05 + f*0.02 + g*0.01 == 2):
                                antall+=1
print(antall)

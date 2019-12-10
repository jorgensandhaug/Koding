import math
antall = 1
for a in range(3):
    current = a*100
    if(current > 200):
        break
    for b in range(5):
        current = a*100 + b*50
        if(current > 200):
            break
        for c in range(11):
            current = a*100 + b*50 + c*20
            if(current > 200):
                break
            for d in range(21):
                current = a*100 + b*50 + c*20 + d*10
                if(current > 200):
                    break
                for e in range(41):
                    current = a*100 + b*50 + c*20 + d*10 + e*5
                    if(current > 200):
                        break
                    for f in range(101):
                        current = a*100 + b*50 + c*20 + d*10 + e*5+f*2
                        if(current > 200):
                            break
                        for g in range(201):
                            current = a*100 + b*50 + c*20 + d*10 + e*5 + f*2 + g
                            if(current > 200):
                                break
                            if (current == 200):
                                # print(a, b, c, d, e, f, g)
                                antall+=1
print(antall)

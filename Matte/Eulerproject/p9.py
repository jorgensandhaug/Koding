import math
for c in range(1000):
    for b in range(c):
        for a in range(b):
            if(math.pow(a, 2) + math.pow(b, 2) == math.pow(c, 2) and a + b + c == 1000):
                print(a*b*c)
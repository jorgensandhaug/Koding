import math
tannkrem = 0
shampo = 0
shamposøndag = 0
rullonsdag = 0
dassrull = 0
counts = 0
counto = 4

with open("logg.txt", "r") as logg:
    for line in logg:
        if(":" in line):
            counts+=1
            counto+=1
        if("tannkrem" in line):
            tall = list(line)[list(line).index("m")-3:list(line).index("m")-1]
            tannkrem += int("".join(tall))
        elif("sjampo" in line):
            tall = list(line)[list(line).index("m")-3:list(line).index("m")-1]
            shampo += int("".join(tall))
            if(counts%7 == 0):
                shamposøndag+=int("".join(tall))
        elif("toalettpapir" in line):
            tall = list(line)[list(line).index("m")-3:list(line).index("m")-1]
            dassrull += int("".join(tall))
            if(counto%7 == 0):
                rullonsdag += int("".join(tall))
        

tuber = math.floor(tannkrem/125)
flasker = math.floor(shampo/300)
ruller = math.floor(dassrull/25)

print(tuber*flasker*ruller*shamposøndag*rullonsdag)
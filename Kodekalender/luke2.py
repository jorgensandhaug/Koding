arr = list()
with open("luke2.txt", "r") as fil:
    for line in fil:
        arr.append(line.strip())
antall = 0
for i in arr:
    for x in i:
        if(x == " "):
            antall+=1
print(antall)

antall = 0
with open("luke2.txt") as fil:
    for line in fil:
        antall += line.strip().count(" ")
print(antall)

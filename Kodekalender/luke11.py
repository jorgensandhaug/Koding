fart = 10703437
fjell, aIs, dist = 0, 0, 0
minuser = {"G":27, "A":59, "S":212}
with open("luke11.txt") as fil:
    for line in fil:
        for i in list(line):
            if fart <= 0:
                print(dist)
                break
            if i == "I":
                aIs+=1
                fart+=12*aIs
            elif i == "F":
                aIs=0
                fart+= [-70, 35][fjell]
                fjell = 1-fjell
            else:
                aIs=0
                fart-= minuser[i]
            dist += 1
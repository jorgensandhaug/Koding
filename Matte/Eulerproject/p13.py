sum = 0
with open("p13.txt", "r") as fil:
    for line in fil:
        sum+= int(line)
print(sum)
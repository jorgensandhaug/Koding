arr = []
with open("turer.txt", "r") as fil:
    for line in fil:
        arr.append(line.split(","))
print(arr)

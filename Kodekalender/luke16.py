import json
arr = []
with open("fjord.txt", "r") as fil:
    for y in fil:
        temp = []
        for x in y:
            temp.append(x)
        arr.append(temp)


for y in range(len(arr)):
    del arr[y][-1]
    for x in range(len(arr[y])):
        if arr[y][x] == "B":
            posX = x
            posY = y

velY = -1
antall = 1
while posX < len(arr[0]):
    prevVel = velY
    if arr[posY+3][posX] == "#":
        velY = -1
    elif arr[posY-3][posX] == "#":
        velY = 1
    if prevVel != velY:
        antall+=1
    else:
        posY+= velY
    posX += 1
print(antall)
    



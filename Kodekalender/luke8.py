
def isKram(tall):
    arr = list(str(tall*tall))
    for i in range(1, len(arr)-1):
        a = int("".join(arr[:i]))
        b = int("".join(arr[i-len(arr):]))
        if(a+b == tall and a!=0 and b!=0):
            return True
    return False
sum = 0
with open("krampus.txt", "r") as fil:
    for line in fil:
        if(isKram(int(line))):
            sum+=int(line.strip())
print(sum)
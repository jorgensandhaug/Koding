def iAlle(arr):
    for i in arr[0]:
        trueArr = []
        for k in range(1, len(arr)):
            if i in arr[k]:
                trueArr.append("True")
            else:
                trueArr.append("False")
        if not "False" in trueArr:
            return i
    return False
print(iAlle([[1, 2, 3], [1, 2, 2], [1, 1, 1], [0, 1, 4], [4, 5, 1, 6]]))


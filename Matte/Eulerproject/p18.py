import math
nums = [
[75],
[95,64],
[17,47,82],
[18,35,87,10],
[20,4,82,47,65],
[19,1,23,75,3,34],
[88,2,77,73,7,63,67],
[99,65,4,28,6,16,70,92],
[41,41,26,56,83,40,80,70,33],
[41,48,72,33,47,32,37,16,94,29],
[53,71,44,65,25,43,91,52,97,51,14],
[70,11,33,28,77,73,17,78,39,68,17,57],
[91,71,52,38,17,14,91,43,58,50,27,29,48],
[63,66,4,68,89,53,67,30,73,16,69,87,40,31],
[4,62,98,27,23,9,70,98,73,93,38,53,60,4,23]
]
highest = 0
summen = 0
for y in range(2):
    for z in range(2):
        for q in range(2):
            for w in range(2):
                for e in range(2):
                    for r in range(2):
                        for t in range(2):
                            for u in range(2):
                                for i in range(2):
                                    for o in range(2):
                                        for p in range(2):
                                            for a in range(2):
                                                for s in range(2):
                                                    for d in range(2):
                                                        summen = nums[0][0]+nums[1][y]+nums[2][y+z]+nums[3][y+z+q]+nums[4][y+z+q+w]+nums[5][y+z+q+w+e]+nums[6][y+z+q+w+e+r]+nums[7][y+z+q+w+e+r+t]+nums[8][y+z+q+w+e+r+t+u]+nums[9][y+z+q+w+e+r+t+u+i]+nums[10][y+z+q+w+e+r+t+u+i+o]+nums[11][y+z+q+w+e+r+t+u+i+o+p]+nums[12][y+z+q+w+e+r+t+u+i+o+p+a]+nums[13][y+z+q+w+e+r+t+u+i+o+p+a+s]+nums[14][y+z+q+w+e+r+t+u+i+o+p+a+s+d]
                                                        if(summen > highest):
                                                            highest = summen
                                                        summen = 0
print(highest)
# summen = 0
# def foo(lengde):
#     global summen
#     global nums
#     stop = 0
#     for i in range(2):
#         if(i == 1):
#             stop+=1
#         if(lengde > 0):
#             foo(lengde-1)
#         summen+=nums[14-lengde][stop]
#     return

# print(sum)
# foo(14)

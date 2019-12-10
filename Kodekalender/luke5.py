import math
string = list("tMlsioaplnKlflgiruKanliaebeLlkslikkpnerikTasatamkDpsdakeraBeIdaegptnuaKtmteorpuTaTtbtsesOHXxonibmksekaaoaKtrssegnveinRedlkkkroeekVtkekymmlooLnanoKtlstoepHrpeutdynfSneloietbol")
##gjør steg 3 motsatt vei
for i in range(0, math.floor(len(string)/2)-2, 3):
    string[i:i+3], string[-(i+1):-(i+4):-1] = string[-(i+1):-(i+4):-1][::-1], string[i:i+3][::-1]
##steg 2 motsatt vei
for i in range(0, len(string)-1, 2):
    string[i], string[i+1] = string[i+1], string[i]
##steg 1 motsatt vei
string[:math.floor(len(string)/2)], string[math.floor(len(string)/2):] = string[math.floor(len(string)/2):], string[:math.floor(len(string)/2)]
print("".join(string))

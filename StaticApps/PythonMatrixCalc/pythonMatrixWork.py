
import copy

"""determinant ve carpim doğrulandı. """

def transpose(a=[]):
    print("transposin matrix..")
    row = len(a)
    try:
        if isinstance(a[0], list):
            coloumn = len(a[0])
        trans=[[None]*row for _ in range(coloumn)]
        print(trans, row, coloumn)
        for i in range(coloumn):
            for j in range(row):
                trans[i][j]=copy.deepcopy(a[j][i])
                print(trans[i][j])
        print("matrix transposed..\n")

        return trans
    except:
        print("list is not in Matrice form.\ntry for single row [[1,2,3]] etc.\n and [[1],[2],[3]] for single row")

def kofaktorAl(a=[]):
    print("calculating Cofactors")
    row = len(a)	
    coloumn = len(a[0])
    kofaktor=[[None]*row for _ in range(coloumn)]
    minor=[[None]*coloumn]*row
    for i in range(coloumn):
        for j in range(row):
            minor[i][j] = minorAl(i, j, a)
            kofaktor[i][j] = minor[i][j]*pow(-1, i+j)
            print(i,j," ",kofaktor[i][j])
    print("Cofactors calculated: ", kofaktor)
    return kofaktor


def determinantAl(a=[]):
    print("calculating determinants\n")
    
    row = len(a)	
    coloumn = len(a[0])
    detMatris = copy.deepcopy(a)
    if not row == coloumn:
        print("the matrix is not a square matrix")
        return None
    elif row == 3:
        #initialising variables
        T1 = 0
        T2 = 0
        toplam = 0
    
        for i in range(0,row-1):
            detMatris.append(detMatris[i])
    
        for i in range(0,row):
            carpim1 = 1
            carpim2 = 1
            print(i)
            for j in range(coloumn):
                carpim1 *= detMatris[i+j][j]
                carpim2 *= detMatris[(i+j)][(coloumn-j-1)]
                print(detMatris[i+j][j], detMatris[(i+j)][(coloumn-j-1)])
            T1 += carpim1
            T2 += carpim2
            print(carpim1-carpim2,"\n")
        toplam += (T1 - T2)
        print("determinant calculated: ",toplam,"\n")
        return toplam
    elif row == 2:
        print("2x2 matrix")
        toplam = detMatris[0][0]*detMatris[1][1]-detMatris[0][1]*detMatris[1][0]
        print("determinant calculated: ",toplam,"\n")
        return toplam
    elif row > 3:
        toplam = 0
        for i in range(0,row):
           toplam += detMatris[i][1]*minorAl(i, 1, detMatris)*pow(-1, i+1)
        print("determinant calculated: ",toplam,"\n")
        return toplam
           
        
                    

def matrisCarp(list_1=[[]], list_2=[[]]):
    matrisCarpim = [[0]*len(list_1) for _ in range(len(list_2))]
    if isinstance(list_1, list) and isinstance(list_2[0], list):
        if (len(list_1)==len(list_2[0])):
            for i in range(0, len(list_1)):
                for j in range(0, len(list_2[0])):
                    for iterator in range(len(list_2)):
                        matrisCarpim[i][j] += list_1[i][iterator]*list_2[iterator][j]
                        print(list_1[i][iterator],list_2[iterator][j])
                    print("matris",i,j,matrisCarpim[i][j])
        return matrisCarpim
                    

    else:
        print("list is not in Matrice form.\ntry for single row [[1,2,3]] etc.\n and [[1],[2],[3]] for single row")


    

def minorAl(index_i, index_j, a=[]):
    print("calculating minors..\n")
    row = len(a)	
    coloumn = len(a[0])
    minMatris = copy.deepcopy(a)
    for i in range(row):
        del minMatris[i][index_j]
        coloumn = len(minMatris[0])

    del minMatris[index_i]
    minor = determinantAl(minMatris)
    print("minors calculated: ",minMatris,"\n")
    return minor

#3x3 matriste doğru sonuç veriyor
def tersiniAl(a=[]):
    b = determinantAl(a)
    matrisTersi = transpose(kofaktorAl(a))
    try:
        if not b == 0:
            for i in range(len(matrisTersi)):
                for j in range(len(matrisTersi[0])):
                    matrisTersi[i][j] *=  b
            return matrisTersi
        else:
            print("determinant is equal to zero")
    except:
        print("an Error occured")
            

def enlistMatrix(a=[[]]):
    listMatrix = []
    for i in range(len(a)):
        for j in range(len(a[0])):
            println(a[i][j])
            listMatrix.append(a[i][j])
    return listMatrix

""" Örnek açlışma için
a = [[3.0, 5.0, 8.0, 7.], [4.0, 7.0, 9.0, 3.], [1.0, 4.0, 6.0, 1.], [11., 13., 15., 9.]]
b = [[6.,5.,4.],[3.,2.,1.],[9.,8.,7.]]
c = determinantAl(a)
print(c)"""



            


from django.http import JsonResponse

teas = {
        "Black Tea": ["212F", "1tsp of tea to 1 cup water", "3-5 minutes"],
        "Green Tea": ["185F", "1tsp of tea to 1 cup water", "1-3 minutes"],
        "Herbal Tea": ["212F", "1tsp of tea to 1 cup water", "3-5 minutes"],
        "Oolong Tea": ["185F", "1tsp of tea to 1 cup water", "1-3 minutes"],
        "White Tea": ["185F", "1tsp of tea to 1 cup water", "1-2 minutes"],
    }

def getTeaInfo(request,tea):
    selectedTea = teas[tea]
    teaInfo = {
        "water": selectedTea[0],
        "teaAmount": selectedTea[1],
        "steep": selectedTea[2]
    }
    return JsonResponse(teaInfo)



def getTeasAvaliable(request):
    return JsonResponse({"teas":list(teas.keys()) })

    steepInfo = teas[tea][-1]
    minute = int(steepInfo[0]) * 60
    return JsonResponse({"steep":minute})






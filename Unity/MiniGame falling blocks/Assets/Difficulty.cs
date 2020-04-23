using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Difficulty{

    public static float timeBeforeMax = 60f;
    
    public static float GetPercent(){
        return Mathf.Clamp01(Time.timeSinceLevelLoad / timeBeforeMax);
    }

}

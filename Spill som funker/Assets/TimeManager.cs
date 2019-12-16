using UnityEngine;

public class TimeManager : MonoBehaviour
{
   public float slowDownAmount = 0.05f;
   public float slowDownLength = 1f;

   void Update()
   {
       Time.timeScale += (1f/slowDownLength) * Time.unscaledDeltaTime;
       Time.timeScale = Mathf.Clamp(Time.timeScale, 0f, 1f);
       Time.fixedDeltaTime = 0.02f*Time.timeScale;
   }
   public void SlowDown()
   {
       Time.timeScale = slowDownAmount;
       Time.fixedDeltaTime = 0.02f*Time.timeScale;
   }
}
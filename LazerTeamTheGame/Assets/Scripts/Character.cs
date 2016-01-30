using System.Collections;
using System.Linq;
using UnityEngine;

public class Character : MonoBehaviour
{
    public int Health = 100;
    public GameObject DamageIndicator;

    public void TakeDamage(int amount)
    {
        if (DamageIndicator.activeInHierarchy) return;
        ShowDamage();
        Health -= amount;
        if (Health <= 0) Destroy(gameObject);
        StartCoroutine(HideDamage());
    }

    private void ShowDamage()
    {
        DamageIndicator.SetActive(true);
    }

    private IEnumerator HideDamage()
    {
        yield return new WaitForSeconds(0.8f);
        DamageIndicator.SetActive(false);
    }
}
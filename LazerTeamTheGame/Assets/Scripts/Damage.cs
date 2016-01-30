using UnityEngine;

public class Damage : MonoBehaviour
{
    public int DamageToDeal = 0;
    public bool ShouldAdjustTrigger = false;
    public int LayerToAdjustTriggerAgainst;

    private void OnCollisionEnter2D(Collision2D other)
    {
        var character = other.gameObject.GetComponent<Character>();
        if (character != null)
        {
            character.TakeDamage(DamageToDeal);
        } 
        // hit a building and shooting dark matter ray
        else if (other.gameObject.layer.Equals(LayerToAdjustTriggerAgainst) && ShouldAdjustTrigger)
        {
            GetComponent<Collider2D>().isTrigger = true;
        }
    }
}
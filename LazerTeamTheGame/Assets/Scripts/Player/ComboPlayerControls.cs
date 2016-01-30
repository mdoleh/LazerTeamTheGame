using UnityEngine;
using System.Collections;
using Assets.Scripts.Player;

public class ComboPlayerControls : MonoBehaviour, IComboPlayerControls
{
    [HideInInspector]
    public bool Shield;
    [HideInInspector]
    public bool Boots;
    [HideInInspector]
    public bool Gun;
    [HideInInspector]
    public bool Helmet;

    private Rigidbody2D rigidbody;

    private void Start()
    {
        rigidbody = GetComponent<Rigidbody2D>();
    }

    // idea, disable basic controls script while combo attack occuring
    public void ShieldDash()
    {
        if (Shield && Boots)
        {
            Shield = false;
            Boots = false;
            disableBasicControls();
            // do attack
            Debug.Log("Shield Dash");
            StartCoroutine(enableBasicControls());
            rigidbody.AddForce(Vector2.right * 10000f * rigidbody.mass);
        }
    }

    public void DarkMatterRay()
    {
        if (Gun && Shield)
        {
            Gun = false;
            Shield = false;
            disableBasicControls();
            // do attack
            Debug.Log("Dark Matter Ray");
            StartCoroutine(enableBasicControls());
        }
    }

    private IEnumerator enableBasicControls()
    {
        yield return new WaitForSeconds(1.5f);
        GetComponent<BasicPlayerControls>().enabled = true;
    }

    private void FixedUpdate()
    {
        ShieldDash();
        DarkMatterRay();
    }

    private void disableBasicControls()
    {
        GetComponent<BasicPlayerControls>().enabled = false;
    }
}

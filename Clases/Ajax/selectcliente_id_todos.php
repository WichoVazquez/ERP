<? 
$user=$_POST['usuario'];

	require("../Objetos/cliente.php");
	require("../Conexion/conexion_prueba_local.php");
	$link=conect();
	$cliente=new Cliente();
	$cliente->conexion($link);
	$array=$cliente->busqueda_cliente_id_todos($_POST['cliente'],$user);
	echo "<ul style='margin:0;padding:0;list-style-type:none;list-style-position:outside; background-color:#FFF; height:100px;'>";
	if($array!=null)
	{
   
   
 	for($renglones=0; $renglones<count($array);$renglones++)
	{

    
    echo"<li><a href=\"javascript:ponerValorCliente({id:'".$array[$renglones][0]."', desc:'".$array[$renglones][1]."'})\" class='texto_lista_chico'>".$array[$renglones][1]."&nbsp;&nbsp;(".$array[$renglones][2].")</li>";
	}
  
}else
	echo "<li class='texto_lista_chico'>No hay Sugerencias</li>";

echo "</ul>";
?>
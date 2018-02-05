<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output encoding="UTF-8" indent="yes" method="html"/>
    
    <xsl:template match="/">
        <html>
            <head>
                <meta charset="UTF-8"/>
            </head>
            <body>
                
                
                <h1 >PROJECT RECORD</h1>
                <hr/>
                <table border="1">
                    <tr>
                        <td width="15%" valign="top">
                            <ol>
                                <li> <a href="#meta">META INFORMAÇÃO</a></li>
                                <li> <a href="#workteam">WORKTEAM</a></li>
                                <li> <a href="#abstract">ABSTRACT</a></li>
                                <li> <a href="#deliverables">DELIVERABLES</a></li>
                                
                                
                            </ol>
                            
                        </td>
                        <td>
                            <!-- META_INFO -->
                            <table name="meta">
                                <xsl:apply-templates select="pr/meta"/>
                            </table>
                            
                            <hr/>
                            <hr/>
                            <!-- WORKTEAM -->
                            <h3 name="workteam"><b>WORKTEAM:</b></h3>
                            <ol type="1">
                                <xsl:apply-templates select="pr/workteam"/>
                            </ol>
                            
                            <hr/>
                            <hr/>
                            <!-- ABSTRACT -->
                            <h3 name="abstract"><b>ABSTRACT:</b></h3>
                            <xsl:apply-templates select="pr/abstract"/>
                            
                            <hr/>
                            <hr/>
                            <!-- DELIVERABLES -->
                            <h3 name="deliverables"><b>DELIVERABLES:</b></h3>
                            <ul>
                                <xsl:apply-templates select="pr/deliverables"/>
                            </ul>
                            
                            
                        </td>
                    </tr>
                    
                </table>
                
                
                
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="meta">
        <tr>
            <td width="50%"> <xsl:value-of select="keyname"/>  </td>
            <td> <xsl:value-of select="bdate"/>  </td>
        </tr>
        <tr>
            <td width="50%"> <xsl:value-of select="title"/>  </td>
            <td> <xsl:value-of select="edate"/>  </td>
        </tr>
        <tr>
            <td width="50%"> <xsl:value-of select="subtitle"/>  </td>
            <td> 
                <ul> 
                    <xsl:apply-templates select="supervisor"/> 
                </ul>  
            </td>
        </tr>
    </xsl:template>
    
    <xsl:template match="supervisor">
        <li>
            <xsl:value-of select="."/>
        </li>
    </xsl:template>
    
    <xsl:template match="workteam">
        <li>
            <xsl:value-of select="."/>
        </li>
    </xsl:template>
    
    <xsl:template match="abstract">
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="p">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    
    <xsl:template match="b">
        <b>
            <xsl:apply-templates/>
        </b>
    </xsl:template>
    
    <xsl:template match="it">
        <i>
            <xsl:apply-templates/>
        </i>
    </xsl:template>
    
    <xsl:template match="u">
        <u>
            <xsl:apply-templates/>
        </u>
    </xsl:template>
    
    <xsl:template match="ackro">
        <b>
            <xsl:apply-templates/>
        </b>
    </xsl:template>
    
    <xsl:template match="iref">
        <a href="{iref/@href}">
            <xsl:value-of select="iref/@href"/>
        </a>
    </xsl:template>
    
    <xsl:template match="xref">
        <a href="{xref/@href}">
            <xsl:value-of select="xref/@href"/>
        </a>
    </xsl:template>
    
    <xsl:template match="deliverables">
        <xsl:apply-templates/>
        
    </xsl:template>
    
    <xsl:template match="deliverable">
        <li>
            <a href="{@url}"><xsl:value-of select="."/></a>
        </li>
        
    </xsl:template>
    
</xsl:stylesheet>